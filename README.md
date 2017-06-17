# Work in progress
This document is in its early stages and all feedback and contributions are welcome. Email sbryant31@gmail.com to join the community.

## Introduction

OpenSync is an Open Source API Connector Specification. As the number of internet applications multiplies, 
many startups are attempting to build API integration solutions that allow end users to easily integrate their cloud applications. Some examples of companies doing this include

* Mulesoft
* Zapier
* Workato
* PieSync
* Datafire
* OpenAPI
* And many more..

Each company has their own target audience and their own user experience. But they all share one commonality - they have built libraries of API Connectors for their users.

Using the libraries fo API connectors, users are able to set up integrations to move data between 2 or more apps/services.

For instance:

```
Trigger: When a new lead is created in Salesforce
Action: Add a line to my spreadsheet in Google Sheets
```

We believe every company maintaining a closed source connector library is extremely counter productive to the success of this entire industry. Therefore, we propose an open standard that everybody can contribute to and maintain.

## Our Vision
OpenSync is based on a few principles that guide our efforts.

1. API Integrations should be very cheap or free for end users and incur a small infrastructure cost for SaaS companies.
2. Different integrators with varying business use cases require different levels of abstraction (Code, Multi-step-workflows, Trigger->Action mapping, and One-Click integrations). 
3. There should be an open source format describing APIs at a higher level than OpenAPI (Connectors), allowing iPaaS companies to focus on serving their users rather than maintaining connector libraries
4. We should standardize various domain specific objects (such as CRM Leads), thus making it easier to set up advanced integrations between systems with automatic/streamlined field mapping.
5. If all integration companies work together to maintain this library, we can have more reliable (and more complete) integration libraries for everyone, and those companies with fundamentally good products will still succeed. 

### What is an API connector?

A "Connector" is a high level description of not just *HOW* to connect with an API, but *WHAT* those functions mean. A connector has all the data for end users to be able to understand the API. 
The platforms extract this high level information from the connector file and display it to the user.

#### Examples
A quick example of how connectors contain both low level details and high level information is the following:

```
A Salesforce connector has a trigger called "New Lead".
new_lead is implemented as a HTTP call to the endpoint `GET /leads`.
`GET /leads` returns a list of Lead objects.
The Lead object contains a field called emailAddress. 
To end users, we call this "Email Address" and provide a description.
```

A real-life code example of a connector can be seen at 
https://github.com/sbryant31/OpenSync/blob/master/connectors/example.js

### Roadmap

#### Recruit IPaaS company leaders
We are reaching out to owners of startup IPaaS companies to learn their needs and how their connector libraries are assembled. There will be a round table between these companies where we discuss a 
common vision and possible implementations. 

#### Building the OpenSync Connector Spec
The second step is to define a connector specification. It is possible that we will use an extension of OpenAPI/Swagger (language independent), as well as a javascript-based API spec, because javascript is the de facto standard web language.

The workato connector SDK is a good learning resource for this investigation.
[https://github.com/workato/connector_sdk](https://github.com/workato/connector_sdk)

#### Standardize Domain Specific Objects
The holy grail of API integration is creating standardization of domain-specific object schemas. What does this mean?
Take CRMs for example. The "Contact" object represents an entity with an Email address, name, and one or more custom fields. If we can create a standardized "Contact" object and each application can create a mapping from their format to the standardized format, 
we can make two-way, instant high-level synchronizations possible for end users, with minimal configuration. Basically, plug-and-play deep API integrations.

### Build Open Source Tools
Based on this standard, there is no limit to the amount of open source tools that can be built around it. An entire open source API Integration engine is a possibility, as well as various helper APIs.

### Contributing / Join the Discussion
We are currently actively seeking contributors from the OpenAPI community.

Our slack community is opensync.slack.com

Email sbryant31@gmail.com for an invite / to join the community. We'd be happy to have you!

## FAQ

### What about Swagger/OpenAPI?

OpenSync and OpenAPI are complementary technologies. OpenSync builds on the legacy that OpenAPI began by building an extension on top of the OpenAPI spec.

OpenAPI provides a description of HTTP endpoints for a given API. OpenSync adds to that description by specifying which HTTP endpoints are Triggers and which are Actions, as well as providing
a high level description of the parameters required and the functionality of
