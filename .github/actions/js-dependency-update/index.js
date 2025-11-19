const core = require('@actions/core');
const exec = require('@actions/exec');
const validateBranchName = ({ branchName }) => /[^a-zA-Z0-9_\-\.\/]+$/.test(branchName);
const validateDirectoryName = ({ dirName }) => /[^a-zA-Z0-9_\-\/]+$/.test(dirName)

async function run() {
    const baseBranch = core.getInput('base-branch');
    const targetBranch = core.getInput('target-branch');
    const ghToken = core.getInput('gh-token');
    const workingDirectory = core.getInput('working-directory');
    const debug = core.getBooleanInput('debug');
    
    core.setSecret(ghToken);
    if(!validateBranchName({ branchName: baseBranch})) {
        core.info ('Invalid base branch name , does not meet our expectations');
        
    }
    if(!validateBranchName({ branchName: targetBranch})) {
        core.info ('Invalid target branch name , does not meet our expectations');

    }
    if(!validateDirectoryName({ dirName: workingDirectory})) {
        core.info ('Invalid Directory , does not meet our expectations');

    }


    await exec.exec ( 'npm update' , [], { 
        cwd: workingDirectory
    });


}

run()