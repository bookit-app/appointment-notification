[![Coverage Status](https://coveralls.io/repos/github/bookit-app/welcome-email-function/badge.svg?branch=master)](https://coveralls.io/github/bookit-app/welcome-email-function?branch=master)

# Cloud Function: appointment-notification

This function is responsible to generate a create appointment or updated appointment email for the user notifying them of the appointment along with name of the salon, staff member, time, and date.

## Update Appointment Email

This function is respsonsible for checking old data set for an appointment and comparing it to the current/new appointment. If the two are not matched an email detailing the differences whether it be the business name, staff member, time, or date will be emailed to the client and staff member providing them with the new appointment details.


## Requirements

### Dependencies 

#### User Profile

Function will retrieeve the user's infromation such as their name and email and address in order to send the appointment-notification email addressed to them with their appointment details. 

#### Appointments

Function checks to see if there is an update to an already set appointment. If an update is dedected, an appointment-notifcation will be triggered signaling the function to send an email to the user. 

### KMS Keys

The environment mentioned below must be contained within an encrypted file called gcloud-env.yaml.enc in order for the deployment process to function properly and so that we do not expose credentials. Credentials are created based on an KMS Keyring and Key within the GCP Project names which are mentioned in the [cloudbuild.yaml](/cloudbuild.yaml) files. Everything was generated per the description provided by Google [Using encrypted resources with Cloud Build](https://cloud.google.com/cloud-build/docs/securing-builds/use-encrypted-secrets-credentials?authuser=1)

### Environment Variables

The cloud function is dependent on information for the sender email account. Therefore, we need to provide some variables to the function especially when deploying. Perform the following:

* Create a file called `gcloud-env.yaml` in the root directory with the following attributes

```yaml
email-account: <EMAIL_ADDRESS>
email-password: <PASSOWRD>
```





## Deploy

Deployment occurs via Cloud Build. There are 2 phases associated with this:

- When PR's are open a build verification occurs and is required to pass prior to allowing merge - Refer [cloudbuild-dev.yaml](/cloudbuild-dev.yaml)
- When merge into master a build and deployment will occur - Refer [cloudbuild.yaml](/cloudbuild.yaml)
