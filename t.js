let z = 'tkhttp-id=xo9khoakemFzJ/WkdGFeHpVbHg3QEIP83jX8vz3Tw4I6nqVPDe.9w0DlZt.3xFpitK8MOZAoN1Z9cDOtfyXBuG1gaYPaP45QmXNRgCI5q5YasmqsvrY2durGd0zTLQBSLALvx62auCEIJmmUtYu7LFbHhIaICUnlDC866lvx6aqD3DvzUsbMbfhUJgg2c0rLXIMdYd9QboSwZnw0RmOKLla9kylIHaENMvdIbwTRVqFQDHV3C6FypDgPbNrOwFgExxlliwaFMOoDm/G99tjVEHzvN2iCrqIXI5Ns0wlOxQY; path=/; Secure; SameSite=None';
let cookie = z.split(';')[0].split('=')[1];
console.log(cookie);
let x = z.match('(^|;)\\s*' + 'tkhttp-id' + '\\s*=\\s*([^;]+)')?.pop() || '';
console.log(x);