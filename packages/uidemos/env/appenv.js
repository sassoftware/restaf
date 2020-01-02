//
// Return whatever you want in the object
// To access this information in your app make sure you use the script tag as follows
// <script src = "/appenv"></script>
// This is an easy way to return application specific information. A typical use case is to 
// return information like model caslib and name, default values etc...
//

let info = {
	host: `${process.env.VIYA_SERVER}`,
};
console.log(JSON.stringify(info, null, 4));
return info;
