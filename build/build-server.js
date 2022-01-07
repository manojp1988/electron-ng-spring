const shell = require('shelljs')

shell.echo('##########################')
shell.echo('#     Building ui       #')
shell.echo('##########################')

shell.cd('ui')
const PUBLIC = '../spring/src/main/resources/public/'
shell.rm('-rf', PUBLIC);
if (shell.exec('npm run build').code !== 0) {
  shell.echo('Error: vue build failed')
  shell.exit(1)
}
shell.cp('-R', 'dist/ui', PUBLIC)
shell.cd('..')

shell.echo('##########################')
shell.echo('#     Building spring    #')
shell.echo('##########################')

shell.cd('spring')
const mvnw = process.platform === 'win32' ? 'mvnw' : './mvnw'
if (shell.exec(mvnw + ' clean package').code !== 0) {
  shell.echo('Error: spring build failed')
  shell.exit(1)
}
