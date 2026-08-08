const User=require("../modules/user")

const {
    getLanguageById,
    submitBatch,
    submitToken
} = require("../utils/problemUtility");

const Problem = require("../modules/problem");
const Submission = require("../modules/submission");
const SolutionVideo = require("../modules/solutionVideo");

const createProblem = async (req, res) => {
    const {
        title,
        description,
        difficulty,
        tags,
        visibleTestCases,
        hiddenTestCases,
        startCode,
        referenceSolution
    } = req.body;

    try {
        for (const { language, completeCode } of referenceSolution) {

            const languageId = getLanguageById(language);

            console.log("Language:", language);
            console.log("Language ID:", languageId);

            if (!languageId) {
                return res
                    .status(400)
                    .send(`Unsupported language: ${language}`);
            }

            const submissions = visibleTestCases.map((testCase) => ({
                source_code: completeCode,
                language_id: languageId,
                stdin: testCase.input,
                expected_output: testCase.output
            }));

            const submitResult = await submitBatch(submissions);

            if (!submitResult) {
                return res
                    .status(500)
                    .send("Judge0 submission failed.");
            }
            const resultToken = submitResult.map(
                (submission) => submission.token
            );

            console.log("Tokens:", resultToken);

            const testResult = await submitToken(resultToken);
            console.log(testResult)

            if (!testResult) {
                return res
                    .status(500)
                    .send("Judge0 polling failed.");
            }

            for (const test of testResult) {
                console.log(test.status);

                if (test.status_id !== 3) {
                    return res.status(400).json({
                        message: "Reference solution failed.",
                        result: test
                    });
                }
            }
        }

        await Problem.create({
            ...req.body,
            problemCreater: req.result._id
        });

        return res.status(201).send("Problem Saved Successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};

const updateProblem=async (req,res)=>{
   const {id}=req.params;
   const {
        title,
        description,
        difficulty,
        tags,
        visibleTestCases,
        hiddenTestCases,
        startCode,
        referenceSolution
    } = req.body;

    try {
        if(!id){
         return    res.status(400).send("Id is missing");
        }
        const DsaProblem=await Problem.findById(id);
        if(!DsaProblem){
          return  res.status(404).send("Id is not presend in server");
        }

        for (const { language, completeCode } of referenceSolution) {
            const languageId = getLanguageById(language);
            console.log("Language:", language);
            console.log("Language ID:", languageId);

            if (!languageId) {
                return res
                    .status(400)
                    .send(`Unsupported language: ${language}`);
            }
            const submissions = visibleTestCases.map((testCase) => ({
                source_code: completeCode,
                language_id: languageId,
                stdin: testCase.input,
                expected_output: testCase.output
            }));

            const submitResult = await submitBatch(submissions);
            if (!submitResult) {
                return res
                    .status(500)
                    .send("Judge0 submission failed.");
            }
            const resultToken = submitResult.map(
                (submission) => submission.token
            );

            console.log("Tokens:", resultToken);

            const testResult = await submitToken(resultToken);

            if (!testResult) {
                return res
                    .status(500)
                    .send("Judge0 polling failed.");
            }

            for (const test of testResult) {
                console.log(test.status);

                if (test.status_id !== 3) {
                    return res.status(400).json({
                        message: "Reference solution failed.",
                        result: test
                    });
                }
            }
        }

       const newProblem= await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});
       res.status(200).send(newProblem);
    }
    catch(err){
        res.status(500).send("Error: "+err)
    }

}

const deleteProblem=async (req,res)=>{
    const {id}=req.params
    try{
        if(!id){
            return res.status(400).send("Id is missing")
        }
        const DsaProblem=await Problem.findById(id);
        if(!id){
            return res.status(404).send("Id is not present in server")
        }

        const deletedProblem= await Problem.findByIdAndDelete(id);

        res.status(200).send("Successfully Deleted")

    }
    catch(err){
        res.status(500).send("Error: "+err)
    }
}

const getProblemById=async (req,res)=>{
    const {id}=req.params
    try{
        if(!id){
            return res.status(400).send("Id is missing")
        }
        const getProblem=await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution ');

        if(!getProblem){
            return res.status(404).send("Problem is missing")
        }

        const video = await SolutionVideo.findOne({ problemId: id }); //find array return krta hai
        let videoData = getProblem.toObject();

        if (video) {
            videoData = {
                ...getProblem.toObject(),
                secureUrl : video.secureUrl,
                cloudinaryPublicId : video.cloudinaryPublicId,
                thumbnailUrl : video.thumbnailUrl,
                duration : video.duration,
            }
            return res.status(200).json(videoData);
        }


    }
    catch(err){
        res.status(500).send("Error: "+err)
    }
}

const getAllProblem=async (req,res)=>{

    try{
        const getProblem=await Problem.find({}).select('_id title difficulty tags');
        if(!getProblem){
            return res.status(404).send("Problem is missing")
        }
        res.status(200).send(getProblem)
    }
    catch(err){
        res.status(500).send("Error: "+err)
    }
}

const solvedAllProblemByUser=async (req,res)=>{
    try{
        const userId=req.result._id           //jisko refer kr raha hai uski info le ata hai 'populate'
        const user=await User.findById(userId).populate({
            path:"problemSolved",
            select:"_id title difficulty tags"
        })
        res.status(200).send(user.problemSolved)
    }
    catch(err){
        res.status(500).send("Error: "+err)
    }
}

const submittedProblem=async (req,res)=>{
    try{
        const userId=req.result._id;
        const problemId=req.params.id;

        const ans =await Submission.find({userId,problemId})

        if(ans.length==0){
            res.status(200).send("No summission")
        }

        res.status(200).send(ans);
    }
    catch(err){
        res.status(500).send("Internal server error")
    }
}


module.exports = {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblemByUser,submittedProblem};
