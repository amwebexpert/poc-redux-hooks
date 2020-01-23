
import Axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
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

  const fetchUsers = async (id: string) => {
    try {
      setData({ userState: data.userState, isFetching: true });
      const response = await Axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setData({ userState: response.data, isFetching: false });

      dispatch({ type: UserActions.USER_ACTION_DATA_RETRIEVED, payload: response.data });
    } catch (e) {
      console.log(e);
      setData({ userState: data.userState, isFetching: false });
    }
  };

  useEffect(() => {
    fetchUsers('4');
  }, [/** list of dependencies that will be causing the re-render */]);

  // ------------------------------------------------------------------------------------------------------------------------------------
  // https://stackoverflow.com/questions/55647287/how-to-send-request-on-click-react-hooks-way/55647571#55647571
  const [isSending, setIsSending] = useState(false)
  const sendRequest = useCallback(async () => {
    // don't send again while we are sending
    if (isSending) {
      return;
    }

    // update state
    setIsSending(true);

    // send the actual request
    await fetchUsers('8');

    // once the request is sent, update state again
    setIsSending(false);
  }, [isSending]) // update the callback if the state changes
  // ------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="body-content">
      <p>Welcome {JSON.stringify(data)}</p>
      <button disabled={isSending} onClick={sendRequest}>Another user</button>
      <StoreEcho />
    </div>
  );

};

export default App;