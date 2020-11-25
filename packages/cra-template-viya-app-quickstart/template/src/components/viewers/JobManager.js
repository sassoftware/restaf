import React from 'react';

function JobManager (props) {
  let {store} = props;
  let jobs = store.submitStatus();
  let msg = `Job Count: ${jobs.size}`;
  console.log(JSON.stringify(jobs, null,4));
  let show =
  <div>
    <h2> This is a place holder to manage jobs running in the background</h2>

    <pre> {msg} </pre>
    <pre> {JSON.stringify(jobs, null,4)}</pre>
    </div>;
  return show;
  }
export default JobManager;
