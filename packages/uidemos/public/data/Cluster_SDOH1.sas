/*--------------------------------------------------
The options statement below should be placed
before the data step when submitting this code.
--------------------------------------------------*/
/*options VALIDMEMNAME=EXTEND VALIDVARNAME=ANY;*/
   /*------------------------------------------
   Generated SAS Scoring Code
     Date             : 02Jul2019:21:19:56
     Locale           : en_US
     Model Type       : Cluster
     Interval variable: SDOH_PMU(SDOH1 Physically Mentally Unhealthy)
     Interval variable: SDOH_Per_Adults_Bachelors(SDOH2 Education)
     Interval variable: SDOH_Unemployment_Rate(SDOH4 Unemployment Rate)
     Interval variable: SDOH_Median_Household_Income(SDOH3 Median Household Income)
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

   array _intVals_67{4} _temporary_;
   array _intStdVals_67{4} _temporary_;
   array _intVars_67[4] _temporary_;
   _intVars_67[1] =
   SDOH_PMU;
   _intVars_67[2] =
   SDOH_Per_Adults_Bachelors;
   _intVars_67[3] =
   SDOH_Unemployment_Rate;
   _intVars_67[4] =
   SDOH_Median_Household_Income;
   array _cntrcoordsInt_67{4,4} _temporary_ (
   5.6752109618776
   34.574068577069
   5.5249572649573
   65162.262238794
   6.1728412355737
   28.076500921419
   8.4815044247788
   50250.811599193
   5.5563377592335
    27.69585347275
    3.586724137931
   55456.199169472
   7.1425816544567
   23.193113163492
   5.9483653846154
   45013.481439879
   );
   array _stdcntrcoordsInt_67 {4,4} _temporary_ (
   -0.545947986801
   1.2465170251288
   -0.140043320021
   1.2424484776721
    0.080847377302
    -0.09555849286
   1.0754374093924
   -0.456774851619
   -0.695675960102
    -0.17418139437
   -0.936879929639
   0.1364012391051
   1.3022939633885
   -1.104224427884
   0.0340260867236
   -1.053590936451
   );
   array _stdscaleInt_67 {4} _temporary_ (
   0.7939278147152
   4.8414322208822
   2.4324097357342
   8775.4507500947
   );
   array _stdcenterInt_67 {4} _temporary_ (
   6.1086542539869
   28.539140887732
            5.8656
   54259.216813453
   );

   *************** check missing interval value ******************;
   _missingflag4Int_ = 0;
   do _i_ = 1 to _numberOfIntVars_ until(_missingflag4Int_);
      if missing( _intVars_67[_i_] ) then
         _missingflag4Int_ = 1;
   end;

   if (_missingflag4Int_ = 1) then
      substr(_WARN_, 1, 1) = 'M';
   ********** prepare interval variable values *********;
   do _i_ = 1 to _numberOfIntVars_;
      if missing (_intVars_67[_i_] ) then do;
         _intVals_67[_i_] = .;
         _intStdVals_67[_i_] = .;
      end; else do;
         if missing (_stdscaleInt_67[_i_] ) then do;
            _intStdVals_67[_i_] = ( _intVars_67[_i_] -  _stdcenterInt_67[_i_]);
         end; else do;
            _intStdVals_67[_i_] = ( _intVars_67[_i_] -  _stdcenterInt_67[_i_])
                  /  _stdscaleInt_67[_i_];
         end;
         _intVals_67[_i_] = _intVars_67[_i_];
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
            _dist_ = _intStdVals_67{_j_} - _stdcntrcoordsInt_67{_i_,_j_};
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
         _dist_ = _intVals_67{_j_} - _cntrcoordsInt_67{_i_,_j_};
         _dist_ = _dist_ ** 2;
         _intMindist2cntr_ = _intMindist2cntr_ + _dist_;
      end;
      _intMindist2cntr_ = _intMindist2cntr_ **              0.5;
      _DISTANCE_ = _intMindist2cntr_;
   end;

if (MISSING('_CLUSTER_ID_'n))then _CLUSTER_ID_ = -1;   /*------------------------------------------*/
   drop '_CLUSTER_ID_'n '_DISTANCE_'n '_WARN_'n '_STANDARDIZED_DISTANCE_'n;
      '_CLUSTER_ID__67'n='_CLUSTER_ID_'n;
'_DISTANCE__67'n='_DISTANCE_'n;
'_WARN__67'n='_WARN_'n;
'_STANDARDIZED_DISTANCE__67'n='_STANDARDIZED_DISTANCE_'n;
   /*------------------------------------------*/
   run;