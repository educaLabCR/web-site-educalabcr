/* Use the owner's original artwork rather than the earlier logo concept. */
const {execFileSync}=require('node:child_process');
const path=require('node:path');
execFileSync('python3',[path.join(__dirname,'educalab-original-logo.py')],{stdio:'inherit'});
