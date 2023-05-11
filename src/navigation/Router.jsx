import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@utils";
import {
  ManageEvent,
  RootPath,
  ValidateEvent,
  NoEventToValidate,
  Authentication,
  UserProfile
} from "@screens";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.root}
          element={
            <ProtectedRoute>
              <RootPath />
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.validateEvent}/:id`}
          element={
            <ProtectedRoute>
              <ValidateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.validateEvent}`}
          exact
          element={
            <ProtectedRoute>
              <NoEventToValidate />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.manageEvent}
          element={
            <ProtectedRoute>
              <ManageEvent />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.authentication} element={<Authentication />} />
        <Route
          path={ROUTES.userProfile}
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
