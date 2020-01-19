
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from './actions/user.actions';
import './App.css';
import { IUserState } from './reducers/user.reducer';
import { IApplicationState } from './store/store';
import StoreEcho from './StoreEcho';

interface IComponentUserState {
  userState?: IUserState;
  isFetching: boolean;
}

const App: React.FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state: IApplicationState) => state.userState);
  const initialState: IComponentUserState = {
    userState: userState,
    isFetching: false
  }
  const [data, setData] = useState(initialState);

  const fetchUsers = async () => {
    try {
      setData({ userState: data.userState, isFetching: true });
      const response = await Axios.get('https://jsonplaceholder.typicode.com/users/2');
      setData({ userState: response.data, isFetching: false });

      dispatch({ type: UserActions.USER_ACTION_DATA_RETRIEVED, payload: response.data });
    } catch (e) {
      console.log(e);
      setData({ userState: data.userState, isFetching: false });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [/** list of dependencies that will be causing the re-render */]);

  return (
    <div className="body-content">
      <p>Welcome {JSON.stringify(data)}</p>
      <StoreEcho />
    </div>
  );

};

export default App;