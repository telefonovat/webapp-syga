import {
  LogInFormData,
  RegisterFormData,
} from '@/shared-types/user/Authentication';
import { VisualizationRequest } from '@/shared-types/visualization/VisualizationRequest';
import { VisualizationResult } from '@/shared-types/visualization/VisualizationResult';

// const API_BASE = import.meta.env.VITE_API_BASE;
const BUILD_ENDPOINT = import.meta.env.VITE_BUILD_ENDPOINT;
const LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT;
const REGISTER_ENDPOINT = import.meta.env.VITE_REGISTER_ENDPOINT;
const USERS_ENDPOINT = import.meta.env.VITE_USERS_ENDPOINT;

class APIClient {
  constructor() {}

  async buildCode(
    visualizationRequest: VisualizationRequest
  ): Promise<VisualizationResult> {
    const { code } = visualizationRequest;

    try {
      const res = await fetch(BUILD_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      });

      const visualizationResult: VisualizationResult =
        await res.json();
      return visualizationResult;
    } catch (err) {
      console.error('Error occurred:', err);

      throw new Error('No response from REST API');
    }
  }

  async loginUser(loginData: LogInFormData): Promise<string> {
    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: loginData }),
      });

      if (response.status !== 200) {
        throw new Error(await response.json());
      }

      const json = await response.json();
      const token: string = json.token;

      //Save JWT token to storage
      localStorage.setItem('token', token);
      localStorage.setItem('username', loginData.username);

      return token;
    } catch (e: any) {
      throw e;
    }
  }

  async registerUser(registerData: RegisterFormData) {
    try {
      const response = await fetch(REGISTER_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: registerData }),
      });
      if (response.status !== 201) {
        throw new Error('Register failed!');
      }
    } catch (e: any) {
      throw e;
    }
  }

  async getUserInfo(username: string, token: string) {
    try {
      const response = await fetch(`${USERS_ENDPOINT}/${username}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      });
    } catch (e: any) {
      throw e;
    }
  }
}

const apiClient = new APIClient();
export { apiClient };
