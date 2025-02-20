import { gql } from "@apollo/client";

const currentUser = gql`
  query clientPortalCurrentUser {
    clientPortalCurrentUser {
      _id
      firstName
      lastName
      avatar
      erxesCustomerId
      phone
      email
    }
  }
`;

const userDetail = gql`
  query UserDetail {
    clientPortalCurrentUser {
      isEmailVerified
      isPhoneVerified
    }
  }
`;

const currentConfig = gql`
  query CurrentConfig {
    currentConfig {
      erxesAppToken
      paymentIds
      deliveryConfig
      name
      description
      pdomain
      checkRemainder
      branchId
      initialCategoryIds
      uiOptions {
        logo
        colors
        favIcon
        bgImage
      }
    }
  }
`;

const queries = { currentUser, currentConfig, userDetail };

export default queries;
