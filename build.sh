 #!/bin/bash
 echo 'Compiling Typescript'
 echo
 echo
 echo 'Server side first...'
 echo
 echo
 tsc --out app.js ./ts/serverside/codesoar.server.ts
 echo
 echo
 echo
 echo
 echo
 echo 'Now Client side...'
 echo
 echo
 tsc --out ./public/javascripts/codesoar.client.js ./ts/clientside/codesoar.editor.ts