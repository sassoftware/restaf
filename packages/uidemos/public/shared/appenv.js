let data = [
          {
            route      : '/stateopioid',
            slsUrl     : 'https://wa2v7jb3m2.execute-api.us-east-1.amazonaws.com/demo/score',
            scoreMethod: 'dsscore',

            model: {
                caslib: 'models',
                name  : 'CLUSTER_SDOH1'
            },
            table: {
                caslib: 'public',
                name  : 'CMS_OPIOID_SDOH'
            },
            desc       : 'Cluster model for states over years',
            selectors  : ['state', 'year'],
            explainVars: ["SDOH_PMU","SDOH_per_Adults_Bachelors", "SDOH_Unemployment_Rate", "SDOH_Median_HouseHold_Income"],
            scoreVar   : '_CLUSTER_ID__67',
            label      : 'New Cluster group',
            details    : '/details/stateOpioid.html',

            threshold    : [3],
            thresholdType: 'EQ'
        },
        {
            route      : '/synopioid',
            slsUrl     : 'https://wa2v7jb3m2.execute-api.us-east-1.amazonaws.com/demo/score',
            scoreMethod: 'dsscore',

            model: {
                caslib: 'models',
                name  : 'NEURALNETWORK_HIGH_MED_1',
            },
            table: {
                caslib: 'public',
                name  : 'SYN_OPIOID_SYNTH_FINAL_V6'
            },
            desc       : 'NN model for opioid',
            selectors  : ['desynpuf_id_bene'],
            explainVars: ['high_med','doctorshop_med', 'opioid_days', 'prescriber_count', 'all_avg_med', 'max_avg_med_90'],
            scoreVar   : 'P_HIGH_Med_3142',
            label      : 'Risk Score',
            details    : '/details/synopioid.html',

            threshold    : [0.5],
            thresholdType: 'GT'
        },
        {
            route      : '/cmscounty',
            slsUrl     : 'https://wa2v7jb3m2.execute-api.us-east-1.amazonaws.com/demo/score',
            scoreMethod: 'dsscore',

            model: {
                caslib: 'models',
                name  : 'cluster_sdoh6_physically_unhealthy_days_1',
            },
            table: {
                caslib: 'public',
                name  : 'cluster_test2'
            },
            desc       : 'CMS County',
            selectors  : ['fips', 'year_num'],
            explainVars: ['SDOH_Physically_Unhealthy_Days_', 'SDOH_Per_Adults_Bachelors', 'SDOH_Unemployment_Rate',
                           'SDOH_Median_Household_Income'],
            scoreVar: '_CLUSTER_ID__439',
            label   : 'Risk',
            details : '/details/fipsOpioid.html',

            threshold    : [0.5],
            thresholdType: 'GT'
        }
    ];

    let j = JSON.stringify(data);
    console.log(j);


  