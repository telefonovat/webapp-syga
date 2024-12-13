import { APIResponse } from '@/shared-types/APIResponse';
import { APIRequest } from '@/shared-types/APIRequest';
import {
  UserLoginInfo,
  UserRegistrationInfo,
} from '@/shared-types/user/Authentication';
import { VisualizationRequest } from '@/shared-types/visualization/VisualizationRequest';
import { VisualizationResult } from '@/shared-types/visualization/VisualizationResult';

// const API_BASE = import.meta.env.VITE_API_BASE;
const BUILD_ENDPOINT = import.meta.env.VITE_BUILD_ENDPOINT;
const LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT;
const REGISTER_ENDPOINT = import.meta.env.VITE_REGISTER_ENDPOINT;
const USERS_ENDPOINT = import.meta.env.VITE_USERS_ENDPOINT;

const validateResponse = (responseJSON: APIResponse) => {
  if (!responseJSON.success) {
    throw new Error(responseJSON.message);
  }

  if (!responseJSON.content) {
    throw new Error('Contents missing from API response');
  }
};
const buildCode = async (
  visualizationRequest: VisualizationRequest
): Promise<VisualizationResult> => {
  const requestBody: APIRequest = {
    content: visualizationRequest,
  };
  const response = await fetch(BUILD_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const responseJSON = (await response.json()) as APIResponse;

  validateResponse(responseJSON);

  const visualizationResult: VisualizationResult =
    responseJSON.content as VisualizationResult;

  return visualizationResult;
};

const loginUser = async (
  loginInfo: UserLoginInfo
): Promise<string> => {
  const requestBody: APIRequest = {
    content: loginInfo,
  };
  const response = await fetch(LOGIN_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(requestBody),
  });

  const responseJSON: APIResponse =
    (await response.json()) as APIResponse;

  validateResponse(responseJSON);

  const responseContent = responseJSON.content;
  const token: string = responseContent.token;

  //Save JWT token to storage
  localStorage.setItem('token', token);
  localStorage.setItem('username', loginInfo.username);

  return token;
};

const registerUser = async (
  registerInfo: UserRegistrationInfo
): Promise<void> => {
  const requestBody: APIRequest = {
    content: registerInfo,
  };
  await fetch(REGISTER_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
};

export { buildCode, loginUser, registerUser };
