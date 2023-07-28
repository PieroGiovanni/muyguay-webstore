import { getFragmentData } from "../../graphql/generated";
import {
  RegularUserInfoFragment,
  RegularErrorFragment,
  LoginDocument,
  RegularUserResponseFragmentDoc,
  RegularUserInfoFragmentDoc,
  RegularErrorFragmentDoc,
  AddGoogleUserDocument,
  UserInput,
  RegisterDocument,
  RegularUserResponseFragment,
} from "../../graphql/generated/graphql";
import { getClient } from "../../lib/client";

export const Login = async (
  email: string,
  password: string
): Promise<{
  user: RegularUserInfoFragment | null | undefined;
  errors: readonly RegularErrorFragment[] | null | undefined;
}> => {
  const { data } = await getClient().mutate({
    mutation: LoginDocument,
    variables: {
      email,
      password,
    },
  });

  const login = getFragmentData(RegularUserResponseFragmentDoc, data!.login);
  const user = getFragmentData(RegularUserInfoFragmentDoc, login.user);
  const errors = getFragmentData(RegularErrorFragmentDoc, login.errors);

  return { user, errors };
};

export const AddGoogleUser = async (input: UserInput) => {
  const { data } = await getClient().mutate({
    mutation: AddGoogleUserDocument,
    variables: {
      input,
    },
  });

  return getFragmentData(RegularUserInfoFragmentDoc, data?.addGoogleUser);
};

export const register = async (
  input: UserInput
): Promise<RegularUserResponseFragment> => {
  const { data } = await getClient().mutate({
    mutation: RegisterDocument,
    variables: {
      input,
    },
  });

  return getFragmentData(RegularUserResponseFragmentDoc, data?.register!);
};
