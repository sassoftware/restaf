/*--------------------------------------------------
The options statement below should be placed
before the data step when submitting this code.
--------------------------------------------------*/
/*options VALIDMEMNAME=EXTEND VALIDVARNAME=ANY;*/
   /*------------------------------------------
   Generated SAS Scoring Code
     Date             : 30Jul2019:20:16:16
     Locale           : en_US
     Model Type       : Cluster
     Interval variable: SDOH_Physically_Unhealthy_Days_(SDOH6 Physically Unhealthy Days)
     Interval variable: SDOH_Per_Adults_Bachelors(SDOH2 Education1)
     Interval variable: SDOH_Unemployment_Rate(SDOH3 Unemployment Rate)
     Interval variable: SDOH_Median_Household_Income(SDOH4 Median Household Income)
     ------------------------------------------*/

   length _WARN_ $4;
   label _WARN_ = 'Warnings';
   label _CLUSTER_ID_ = 'Cluster ID';
   label _DISTANCE_ = 'Distance to Centroid';

   _i_ = 0;
   _j_ = 0;
   _k_ = 0;
   _l_ = 0;
   _dist_ = 0;
   _minDist_ = 0;
   _found_ = 0;
   _unknown_ = 0;
   _unknownflag_ = 0;
   _intMindist2cntr_ = 0;
   _missingflag4Int_ = 0;
   _numberOfIntVars_ = 4;
   _minDistInt_ = 0;
   label _STANDARDIZED_DISTANCE_ = 'Standardized Distance to Centroid';

   drop _i_;
   drop _j_;
   drop _k_;
   drop _l_;
   drop _dist_;
   drop _minDist_;
   drop _minDistInt_;
   drop _unknown_;
   drop _unknownflag_;
   drop _found_;
   drop _intMindist2cntr_;
   drop _missingflag4Int_;
   drop _numberOfIntVars_;
   drop _minDistInt_;

   array _intVals_439{4} _temporary_;
   array _intStdVals_439{4} _temporary_;
   array _intVars_439[4] _temporary_;
   _intVars_439[1] =
   SDOH_Physically_Unhealthy_Days_;
   _intVars_439[2] =
   SDOH_Per_Adults_Bachelors;
   _intVars_439[3] =
   SDOH_Unemployment_Rate;
   _intVars_439[4] =
   SDOH_Median_Household_Income;
   array _cntrcoordsInt_439{4,4} _temporary_ (
   3.0267344264664
    40.73654855643
   4.5016404199475
   73253.345144357
   3.1748155867421
   23.482869339272
   4.4175018559762
   52859.890126206
   5.0717963953358
   13.894727354664
   9.3289319513294
   35934.982875169
     4.17723170653
   17.079836808704
   6.0463463281958
   42933.089573889
   );
   array _stdcntrcoordsInt_439 {4,4} _temporary_ (
   -0.819627593948
   2.1063188660484
   -0.557938370531
   1.9606280602175
   -0.667309695546
   0.2473923533712
    -0.59384668401
   0.3473109632455
   1.2839454778829
   -0.785642463039
   1.5022334387125
   -0.991610872631
    0.363786470954
   -0.442475980379
   0.1013049225367
   -0.437993784529
   );
   array _stdscaleInt_439 {4} _temporary_ (
   0.9721848963817
   9.2815283979727
   2.3431499789112
   12640.698506466
   );
   array _stdcenterInt_439 {4} _temporary_ (
   3.8235639939605
   21.186690186017
   5.8089737010904
    48469.63695183
   );

   *************** check missing interval value ******************;
   _missingflag4Int_ = 0;
   do _i_ = 1 to _numberOfIntVars_ until(_missingflag4Int_);
      if missing( _intVars_439[_i_] ) then
         _missingflag4Int_ = 1;
   end;

   if (_missingflag4Int_ = 1) then
      substr(_WARN_, 1, 1) = 'M';
   ********** prepare interval variable values *********;
   do _i_ = 1 to _numberOfIntVars_;
      if missing (_intVars_439[_i_] ) then do;
         _intVals_439[_i_] = .;
         _intStdVals_439[_i_] = .;
      end; else do;
         if missing (_stdscaleInt_439[_i_] ) then do;
            _intStdVals_439[_i_] = ( _intVars_439[_i_] -  _stdcenterInt_439[_i_]);
         end; else do;
            _intStdVals_439[_i_] = ( _intVars_439[_i_] -  _stdcenterInt_439[_i_])
                  /  _stdscaleInt_439[_i_];
         end;
         _intVals_439[_i_] = _intVars_439[_i_];
      end;
   end;
   ****************** find the closest cluster ******************;
   if _missingflag4Int_ > 0  then
   do;
      _CLUSTER_ID_ = .;
      _DISTANCE_ = .;
      _minDistInt_ = .;
      _STANDARDIZED_DISTANCE_ = .;
   end;
   else
   do;
      _CLUSTER_ID_ = .;
      _minDist_ = 8.988465674E307;
      do _i_=1 to               4;
         _intMindist2cntr_ = 0;
         do _j_=1 to               4;
            _dist_ = _intStdVals_439{_j_} - _stdcntrcoordsInt_439{_i_,_j_};
            _dist_ = _dist_ ** 2;
            _intMindist2cntr_ = _intMindist2cntr_ + _dist_;
         end;
         _intMindist2cntr_ = _intMindist2cntr_ **              0.5;
         if( _minDist_  > _intMindist2cntr_) then do;
            _CLUSTER_ID_ = _i_;
            _minDist_ = _intMindist2cntr_;
         end;
         _STANDARDIZED_DISTANCE_ = _minDist_;
      end;
      _DISTANCE_ = 8.988465674E307;
      _i_ = _CLUSTER_ID_;
      _intMindist2cntr_ = 0;
      do _j_=1 to               4;
         _dist_ = _intVals_439{_j_} - _cntrcoordsInt_439{_i_,_j_};
         _dist_ = _dist_ ** 2;
         _intMindist2cntr_ = _intMindist2cntr_ + _dist_;
      end;
      _intMindist2cntr_ = _intMindist2cntr_ **              0.5;
      _DISTANCE_ = _intMindist2cntr_;
   end;

if (MISSING('_CLUSTER_ID_'n))then _CLUSTER_ID_ = -1;   /*------------------------------------------*/
   drop '_CLUSTER_ID_'n '_DISTANCE_'n '_WARN_'n '_STANDARDIZED_DISTANCE_'n;
      '_CLUSTER_ID__439'n='_CLUSTER_ID_'n;
'_DISTANCE__439'n='_DISTANCE_'n;
'_WARN__439'n='_WARN_'n;
'_STANDARDIZED_DISTANCE__439'n='_STANDARDIZED_DISTANCE_'n;
   /*------------------------------------------*/