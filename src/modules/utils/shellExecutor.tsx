import { exec } from 'child_process';

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
}

/**
 * Executes a shell command or script and returns the output.
 * @param command - The shell command to execute (e.g., 'bash setupDB.sh').
 * @param args - Optional arguments to pass to the shell script.
 * @returns Promise resolving to an ExecutionResult object.
 */
export async function executeShellCommand(command: string, args: string[] = []): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    const fullCommand = `${command} ${args.join(' ')}`;
    exec(fullCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`, error.message);
        resolve({
          success: false,
          output: stdout.trim(),
          error: stderr || error.message,
        });
        return;
      }
      resolve({ success: true, output: stdout.trim() });
    });
  });
}

/**
 * Example usage of executeShellCommand
 * (Uncomment the following lines to use the example directly in this file).
 *
 * (async () => {
 *   const result = await executeShellCommand('bash ./scripts/setupDB.sh');
 *   if (result.success) {
 *     console.log('Command executed successfully:', result.output);
 *   } else {
 *     console.error('Command execution failed:', result.error);
 *   }
 * })();
 */

export default executeShellCommand;
