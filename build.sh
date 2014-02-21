 #!/bin/bash
 echo 'Compiling Typescript'
 echo
 echo
 echo 'Server side first...'
 echo
 echo
 tsc --out app.js ./typescript/serverside/codesoar.server.ts
 echo
 echo
 echo
 echo
 echo
 echo 'Now Client side...'
 echo
 echo
 tsc --out ./public/javascripts/codesoar.client.js ./typescript/clientside/codesoar.editor.ts