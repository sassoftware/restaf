var src = `
		%let syscc=0;
        ods html style=barrettsblue; 
		libname tempdata '/tmp';run; 
		data tempdata.testdata;
		keep x1 x3 x2 key;
		do i = 1 to 10; 
		key=compress('key'||i);
		   x1=i; 
		   x3=i*10;
		   x2='X2'; 
		output;
		end;
		run;
		quit;
            `;
console.log(src);
let asrc = src.replace(/\t/g, ' ');
asrc = asrc.split( /\r?\n/);


console.log(asrc);
