# Repository agent instructions

**Owner:** Repository workflow

## Scope

The authorized work is the portfolio frontend setup. Application code, assets, skills, and frontend owners live in `frontend/`.
Read [frontend rules](frontend/AGENTS.md). Preserve dirty work. Do not commit, push, reset, stash, clean, or publish without authorization.
Root `.agents/`, `.codex/`, and `.aws/` are protected. Project skills belong in `frontend/.agents/skills/`.
Direct user instructions override skill defaults. A supplied setup blueprint authorizes its routine implementation choices.
Use the brainstorming workflow for the later portfolio content and design task.

## Shell execution in WSL

Before the first repository command, check the executor environment and working directory.
For Linux or WSL, run Linux commands directly with the Linux shell and workspace path.
Do not wrap Linux commands with `wsl.exe`, `cmd.exe`, or `powershell.exe`.
If Windows execution is required, request approval after a sandbox-related failure.
Do not repeat an unchanged command after `UtilBindVsockAnyPort: socket failed 1`.
Do not change sandbox permissions to repair ordinary Linux repository commands.
Network downloads and loopback servers need their own permissions when the sandbox blocks them.

## Startup order

Read this file, frontend instructions, frontend README, handoff, and the relevant canonical owner.
Use `rg` first. Inspect live Git status and diffs before current-state claims.
Imported skills are guidance. External plugin availability is not project integration evidence.

## Completion procedure

Run proportional checks. Record observed results and limits in the frontend handoff.
Review the bounded diff and run `git diff --check`. Leave the work uncommitted unless instructed otherwise.
