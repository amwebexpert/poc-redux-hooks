
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from './actions/user.actions';
import { IUser } from './api/IUser';
import './App.css';
import { IApplicationState } from './store/store';
import StoreEcho from './StoreEcho';

interface IComponentUserState {
  user?: IUser;
  isFetching: boolean;
}

const App: React.FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: IApplicationState) => state.userState ? state.userState.user : undefined);
  const initialState: IComponentUserState = {
    user: user,
    isFetching: false
  }
  const [data, setData] = useState(initialState);

  const fetchUsers = async () => {
    try {
      setData({ user: data.user, isFetching: true });
      const response = await Axios.get('https://jsonplaceholder.typicode.com/users/2');
      setData({ user: response.data, isFetching: false });

      dispatch({ type: UserActions.USER_ACTION_DATA_RETRIEVED, payload: response.data });
    } catch (e) {
      console.log(e);
      setData({ user: data.user, isFetching: false });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="body-content">
      <p>Welcome {JSON.stringify(data)}</p>
      <StoreEcho />
    </div>
  );

};

export default App;