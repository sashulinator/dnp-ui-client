import { execSync, exec, spawn } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class ShellCommand {
  constructor(command) {
    this.command = command;
    this.options = {
      cwd: process.cwd(),
      env: process.env,
      stdio: 'inherit',
      encoding: 'utf-8'
    };
  }

  cwd(path) {
    this.options.cwd = path;
    return this;
  }

  env(vars) {
    this.options.env = { ...process.env, ...vars };
    return this;
  }

  quiet() {
    this.options.stdio = 'pipe';
    return this;
  }

  async text() {
    try {
      const { stdout } = await execAsync(this.command, {
        ...this.options,
        encoding: 'utf-8'
      });
      return stdout.trim();
    } catch (error) {
      throw new Error(`Command failed: ${this.command}\n${error.stderr || error.message}`);
    }
  }

  json() {
    return this.text().then(JSON.parse);
  }

  async run() {
    return this.text();
  }

  sync() {
    try {
      return execSync(this.command, {
        ...this.options,
        encoding: 'utf-8'
      }).trim();
    } catch (error) {
      throw new Error(`Command failed: ${this.command}\n${error.stderr || error.message}`);
    }
  }

  pipe(destination) {
    const [cmd, ...args] = this.command.split(/\s+/);
    const child = spawn(cmd, args, {
      ...this.options,
      stdio: ['pipe', 'pipe', 'inherit']
    });

    if (typeof destination === 'function') {
      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
      });
      child.stdout.on('end', () => {
        destination(null, output.trim());
      });
      child.on('error', (err) => {
        destination(err);
      });
    } else if (typeof destination === 'string') {
      const nextCommand = $(destination);
      nextCommand.options.stdio = ['pipe', 'inherit', 'inherit'];
      const nextProcess = spawn(
        nextCommand.command.split(/\s+/)[0],
        nextCommand.command.split(/\s+/).slice(1),
        nextCommand.options
      );
      child.stdout.pipe(nextProcess.stdin);
    }

    return this;
  }
}

// Примеры использования:
// await $`echo Hello World!`.text();
// await $('echo Hello World!').text();
// $`ls -la`.sync();
// await $`cat file.txt`.pipe($`grep "search term"`).text();

export function $(strings, ...values) {
  // Шаблонная строка
  if (strings && strings.raw) {
    const command = String.raw(strings, ...values);
    return new ShellCommand(command);
  }
  // Просто строка
  if (typeof strings === 'string') {
    return new ShellCommand(strings);
  }
  throw new Error('Invalid command');
}
