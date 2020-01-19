
import React from 'react';
import { useSelector } from 'react-redux';
import { IApplicationState } from './store/store';

const StoreEcho: React.FunctionComponent<{}> = (props) => {
  const userState = useSelector((state: IApplicationState) => state.userState ? state.userState : undefined);
  console.log('useSelector', userState);

  return (
    <div>
      <hr />
      <p>Store.userState: {JSON.stringify(userState)}</p>
    </div>
  );

};

export default StoreEcho;