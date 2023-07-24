import { useFragment } from "../../generated/graphql";
import {
  RegularUserInfoFragment,
  RegularErrorFragment,
  LoginDocument,
  RegularUserResponseFragmentDoc,
  RegularUserInfoFragmentDoc,
  RegularErrorFragmentDoc,
  AddGoogleUserDocument,
  UserInput,
} from "../../generated/graphql/graphql";
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

  const login = useFragment(RegularUserResponseFragmentDoc, data!.login);
  const user = useFragment(RegularUserInfoFragmentDoc, login.user);
  const errors = useFragment(RegularErrorFragmentDoc, login.errors);

  return { user, errors };
};

export const AddGoogleUser = async (input: UserInput) => {
  const { data } = await getClient().mutate({
    mutation: AddGoogleUserDocument,
    variables: {
      input,
    },
  });

  return useFragment(RegularUserInfoFragmentDoc, data?.addGoogleUser);
};
