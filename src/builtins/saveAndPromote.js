/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
function saveAndPromote() {
    return `
    function saveAndPromote(caslib, source, targetlib, target) {

        /* load source */
        r = checkAndLoadTable(caslib, source);
        print rc;

        sashdat = target||".sashdat";
        print sashdat;
        table.save /
            caslib= targetlib name=sashdat
            table = {caslib=caslib name=source} replace=true;
        
        table.droptable /
            caslib=targetlib name=target quiet=true;
       
        table.loadtable result=r/
            caslib=targetlib casout={caslib=targetlib name=target promote=TRUE}
            path=sashdat;
            
        print r;
        
        return r;
    end;
        `;
}
export default saveAndPromote;