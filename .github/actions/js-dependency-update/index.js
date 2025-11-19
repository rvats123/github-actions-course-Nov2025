const core = require('@actions/core');
const exec = require('@actions/exec');
const validateBranchName = ({ branchName }) => /[^a-zA-Z0-9_\-\.\/]+$/.test(dirName);
const validateDirectoryName = ({ dirName }) => /[^a-zA-Z0-9_\-\/]+$/.test(branchName)

async function run() {
    const baseBranch = core.getInput('base-branch');
    const targetBranch = core.getInput('target-branch');
    const ghToken = core.getInput('gh-token');
    const workingDirectory = core.getInput('working-directory');
    const debug = core.getBooleanInput('debug');
    
    core.setSecret(ghToken);
    if(!validateBranchName({ branchName: baseBranch})) {
        core.setFailed ('Invalid base branch name , does not meet our expectations');
        return;
    }
    if(!validateBranchName({ branchName: targetBranch})) {
        core.setFailed ('Invalid target branch name , does not meet our expectations');
        return;
    }
    if(!validateDirectoryName({ dirName: workingDirectory})) {
        core.setFailed ('Invalid Directory , does not meet our expectations');
        return;
    }
    core.info('[js-depedency-update] : base branch is ${baseBranch}');
    core.info('[js-depedency-update] : target branch is ${targetBranch}');
    core.info('[js-depedency-update] : direcotry is ${workingDiretory}');

    await exec.exec ( 'npm update' , [], { 
        cwd: workingDirectory
    });


}

run()