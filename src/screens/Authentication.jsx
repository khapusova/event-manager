import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@utils";
import { getTempUser } from "@store/autho/duck";
import { Flex, Spinner } from "@atoms";
import { HeaderAutho } from "@molecules";
import { AuthenticationFlex } from "@organisms";

const Authentication = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.temporaryUser.user);
  const [initialUser, setInitialUser] = useState(user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTmp = async () => {
      await dispatch(getTempUser());
      setLoading(false);
    };
    getTmp();
  }, [dispatch]);

  useEffect(() => {
    if (loading) setInitialUser(user);
  }, [user, loading]);

  if (!loading && initialUser.token !== null) {
    return <Navigate to={ROUTES.userProfile} replace />;
  }

  return (
    <>
      <HeaderAutho />
      {loading ? (
        <Flex flex justifyCenter itemsCenter spaceMargin="big">
          <Spinner />
        </Flex>
      ) : (
        <AuthenticationFlex />
      )}
    </>
  );
};

export default Authentication;
