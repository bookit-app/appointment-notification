[![Coverage Status](https://coveralls.io/repos/github/bookit-app/appointment-notification/badge.svg?branch=master)](https://coveralls.io/github/bookit-app/appointment-notification?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/71f873d01e9747c4ada06f2505d1a6ee)](https://www.codacy.com/gh/bookit-app/appointment-notification?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bookit-app/appointment-notification&amp;utm_campaign=Badge_Grade)

# Cloud Function: appointment-notification

This function is responsible to generate a updated appointment email for the user notifying them that there were changes to their appointment.

## Update Appointment Email

When firestore update triggers are fired this function will load the necessary information and generate an email notification.

## Dependencies 

### User Profile

Function will retrieve the user's information such as their name and email and address in order to send the appointment-notification email addressed to them with their appointment details. 

### Appointments

Function checks to see if there is an update to an already set appointment. If an update is detected, an appointment-notification will be triggered signaling the function to send an email to the user. 

### KMS Keys

The environment mentioned below must be contained within an encrypted file called gcloud-env.yaml.enc in order for the deployment process to function properly and so that we do not expose credentials. Credentials are created based on an KMS Keyring and Key within the GCP Project names which are mentioned in the [cloudbuild.yaml](/cloudbuild.yaml) files. Everything was generated per the description provided by Google [Using encrypted resources with Cloud Build](https://cloud.google.com/cloud-build/docs/securing-builds/use-encrypted-secrets-credentials?authuser=1)

### Environment Variables

The cloud function is dependent on information for the sender email account. Therefore, we need to provide some variables to the function especially when deploying. Perform the following:

* Create a file called `gcloud-env.yaml` in the root directory with the following attributes

```yaml
email-account: <EMAIL_ADDRESS>
email-password: <PASSOWRD>
profile-service-host: <URL FOR THE QUERY PROFILE SERVICE>
```

## Deploy

Deployment occurs via Cloud Build. There are 2 phases associated with this:

- When PR's are open a build verification occurs and is required to pass prior to allowing merge - Refer [cloudbuild-dev.yaml](/cloudbuild-dev.yaml)
- When merge into master a build and deployment will occur - Refer [cloudbuild.yaml](/cloudbuild.yaml)
