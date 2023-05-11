import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ROUTES } from "@utils";
import { getTempUser } from "@store/autho/duck";
import { Spinner, Flex } from "@atoms";

const ProtectedRoute = ({ children }) => {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.temporaryUser.user.token);

  useEffect(() => {
    const executeOnLoad = async () => {
      await dispatch(getTempUser());
      setDispatched(true);
    };
    executeOnLoad();
  }, [dispatch]);

  if (!dispatched) {
    return (
      <Flex flex justifyCenter itemsCenter>
        <Spinner />
      </Flex>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.authentication} replace />;
  }

  return children;
};

export default ProtectedRoute;
