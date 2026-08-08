const Problem=require("../modules/problem")
const Submission=require("../modules/submission");
const { getLanguageById, submitToken,submitBatch } = require("../utils/problemUtility");

const submitCode= async (req,res)=>{
  try{
    const userId=req.result._id
    const problemId=req.params.id;
    let {code, language}=req.body;

    if(!userId || !code || !problemId || !language){
      return res.status(400).send("Some field is missing")
    }
    if(language==='cpp'){
      language='c++';
    }

    //fetch the problem from database
    const problem= await Problem.findById(problemId);
    if (!problem) {
    return res.status(404).send("Problem not found");
    }
    //testcases(hidden)

    const submittedResult=await Submission.create({
      userId,
      problemId,
      code,
      language,
      // testCasesPassed:0,
      status:'pending',
      testCasesTotal:problem.hiddenTestCases.length
    })

    //judge0 ko code submit krna hai
    const languageId=getLanguageById(language);
    const submissions=problem.hiddenTestCases.map((testcase)=>({
      source_code:code,
      language_id:languageId,
      stdin:testcase.input,
      expected_output:testcase.output
    }));
    const submitResult=await submitBatch(submissions)

    const resultToken=submitResult.map((value)=>value.token);
    const testResult=await submitToken(resultToken);
    if (!testResult) {
    return res.status(500).send("Judge0 polling failed");
    }
    //submit result ko update kro
    let testCasesPassed=0;
    let runtime=0;
    let memory=0;
    let status="accepted";
    let errorMessage=null
console.log("Judge0 Response:");
console.log(JSON.stringify(testResult, null, 2));

    for(const test of testResult){
      if(test.status_id==3){
        testCasesPassed++;
        runtime=runtime+parseFloat(test.time || 0)
        memory = Math.max(memory, Number(test.memory || 0));
      }
      else{
        if(test.status_id==4){
          status="Error"
          errorMessage=test.stderr
        }
        else{
          status="wrong"
          errorMessage=test.stderr
        }
      }

    }

    //store the result in subission
    submittedResult.status=status;
    submittedResult.testCasesPassed=testCasesPassed
    submittedResult.errorMessage=errorMessage
    submittedResult.runtime=runtime
    submittedResult.memory=memory

    await submittedResult.save()

    //problem id ko submit karenge userSchema ke problemSolved mein if it is not present there
    if(!req.result.problemSolved.includes(problemId)){
      req.result.problemSolved.push(problemId)
      await req.result.save();
    }
     const accepted=(status=='accepted')
     res.status(201).json({
      accepted,
      totalTestCases:submittedResult.testCasesTotal,
      passedTestCases:testCasesPassed,
      runtime,
      memory
     })

      // res.status(201).send(submittedResult)
  }
  catch(err){
    res.status(500).send("Internal Server Error "+ err)
  }
}

const decodeJudgeOutput = (value) => {
  if (!value) return value;

  try {
    return Buffer.from(value, 'base64').toString('utf8');
  } catch {
    return value;
  }
};

const runCode=async (req,res)=>{
  try{
    const userId=req.result._id
    const problemId=req.params.id;
    let {code, language}=req.body;

    if(!userId || !code || !problemId || !language){
      return res.status(400).send("Some field is missing")
    }
    if(language==='cpp'){
      language='c++';
    }

    //fetch the problem from database
    const problem= await Problem.findById(problemId);
    if (!problem) {
    return res.status(404).send("Problem not found");
    }
    //testcases(hidden)



    //judge0 ko code submit krna hai
    const languageId=getLanguageById(language);
    if (!languageId) {
      return res.status(400).json({ message: `Unsupported language: ${language}` });
    }

    const submissions=problem.visibleTestCases.map((testcase)=>({
      source_code:code,
      language_id:languageId,
      stdin:testcase.input,
      expected_output:testcase.output
    }));
    const submitResult=await submitBatch(submissions)
    if (!submitResult) {
      return res.status(500).send("Judge0 submission failed");
    }

    const resultToken=submitResult.map((value)=>value.token);
    const testResult=await submitToken(resultToken);
    if (!testResult) {
    return res.status(500).send("Judge0 polling failed");
    }

    const testCases = testResult.map((test, index) => ({
      ...test,
      stdout: decodeJudgeOutput(test.stdout),
      stderr: decodeJudgeOutput(test.stderr),
      compile_output: decodeJudgeOutput(test.compile_output),
      stdin: problem.visibleTestCases[index]?.input,
      expected_output: problem.visibleTestCases[index]?.output
    }));

    const success = testCases.every((test) => test.status_id === 3);
    const runtime = testCases.reduce((total, test) => total + parseFloat(test.time || 0), 0);
    const memory = Math.max(...testCases.map((test) => Number(test.memory || 0)), 0);

    res.status(201).json({
      success,
      runtime,
      memory,
      testCases
    })
  }
  catch(err){
    res.status(500).send("Internal Server Error "+ err)
  }
}
module.exports={submitCode,runCode}
