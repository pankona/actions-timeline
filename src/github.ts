// @octokit/rest@20 dropped support for node16. However, node16 bundled in actions/runner and still supported.
// So, we use @octokit/rest@19.
import { Octokit, RestEndpointMethodTypes } from "npm:@octokit/rest@19.0.13";

export type Workflow =
  RestEndpointMethodTypes["actions"]["getWorkflowRun"]["response"]["data"];
export type WorkflowJobs =
  RestEndpointMethodTypes["actions"]["listJobsForWorkflowRun"]["response"][
    "data"
  ]["jobs"];

export const createOctokit = (token: string): Octokit => {
  const baseUrl = Deno.env.get("GITHUB_API_URL") ?? "https://api.github.com";
  return new Octokit({
    auth: token,
    baseUrl,
  });
};

export const fetchWorkflow = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  runId: number,
): Promise<Workflow> => {
  const workflow = await octokit.rest.actions.getWorkflowRun({
    owner,
    repo,
    run_id: runId,
  });
  return workflow.data;
};

export const fetchWorkflowRunJobs = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  runId: number,
): Promise<WorkflowJobs> => {
  const workflowJob = await octokit.rest.actions.listJobsForWorkflowRun({
    owner,
    repo,
    run_id: runId,
  });
  return workflowJob.data.jobs;
};