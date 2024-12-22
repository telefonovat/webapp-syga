import { APIResponse } from '@/shared-types/APIResponse';
import { APIRequest } from '@/shared-types/APIRequest';
import { Algorithm } from '@/shared-types/user/Algorithm';
import {
  UserLoginInfo,
  UserRegistrationInfo,
} from '@/shared-types/user/Authentication';
import { VisualizationRequest } from '@/shared-types/visualization/VisualizationRequest';
import { VisualizationResult } from '@/shared-types/visualization/VisualizationResult';
import { router } from '@/router';
import { useUserStore } from '@/store/user/userStore';
import { storeToRefs } from 'pinia';

// const API_BASE = import.meta.env.VITE_API_BASE;
const BUILD_ENDPOINT = import.meta.env.VITE_BUILD_ENDPOINT;
const LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT;
const REGISTER_ENDPOINT = import.meta.env.VITE_REGISTER_ENDPOINT;

const validateResponse = (responseJSON: APIResponse) => {
  if (!responseJSON.success) {
    throw new Error(responseJSON.message);
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
  // localStorage.setItem('token', token);
  // localStorage.setItem('username', loginInfo.username);

  const userStore = useUserStore();
  userStore.setAuthenticationInfo(loginInfo.username, token);

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

const getUserAlgorithms = async (): Promise<Algorithm[]> => {
  const userStore = useUserStore();
  const { token, username } = storeToRefs(userStore);

  if (token.value === null) {
    throw new Error('Please log in');
  }
  if (username.value === null) {
    throw new Error('Username not defined');
  }

  const response = await fetch(`/api/users/${username.value}/codes`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `BEARER ${token.value}`,
    },
    // body: JSON.stringify(requestBody),
  });

  const responseJSON = (await response.json()) as APIResponse;

  if (response.status === 401) {
    userStore.$reset();
    alert('Token expired. Please log in again');
    router.replace('/');
  }
  const algorithms = responseJSON.content as Algorithm[];

  return algorithms;
};
const updateUserAlgorithm = async (
  uuid: string,
  algorithmUpdate: Partial<Algorithm>
) => {
  const userStore = useUserStore();
  const { token, username } = storeToRefs(userStore);
  if (token.value === null) {
    throw new Error('Please log in');
  }
  if (username.value === null) {
    throw new Error('Username not defined');
  }

  const requestBody: APIRequest = {
    content: algorithmUpdate,
  };
  const response = await fetch(`/api/algorithms/detail/${uuid}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `BEARER ${token.value}`,
    },
    body: JSON.stringify(requestBody),
  });
};

const saveUserAlgorithm = async (
  algorithm: Omit<Algorithm, 'uuid'>
) => {
  const userStore = useUserStore();
  const { token, username } = storeToRefs(userStore);
  if (token.value === null) {
    throw new Error('Please log in');
  }
  if (username.value === null) {
    throw new Error('Username not defined');
  }

  const requestBody: APIRequest = {
    content: algorithm,
  };
  const response = await fetch(`/api/users/${username.value}/codes`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `BEARER ${token.value}`,
    },
    body: JSON.stringify(requestBody),
  });

  const responseJSON = (await response.json()) as APIResponse;

  validateResponse(responseJSON);
};

export {
  buildCode,
  loginUser,
  registerUser,
  getUserAlgorithms,
  saveUserAlgorithm,
  updateUserAlgorithm,
};
