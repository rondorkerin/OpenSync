# Work in progress
This document is in its early stages and all feedback and contributions are welcome. Email sbryant31@gmail.com to join the community.

## Overview

OpenSync is an Open Source API integration Engine, API Connector Specificiation, and DAO (Decentralized Autonomous Organization). As the number of internet applications multiplies,
many startups are attempting to build API integration solutions that allow end users to easily integrate their cloud applications. Some examples of companies doing this include

* Mulesoft
* Zapier
* Workato

Integrations between apps usually have `Triggers` and `Actions` that perform some data transfer between two or more applications. `IF` a trigger happens, `THEN` perform one or more actions.

For instance:

```
Trigger: When a new lead is created in Salesforce
Action: Add a line to my spreadsheet in Google Sheets
```

Each API Integration Platform company listed above has built an interface for users to map triggers to actions in some way. Each one of these companies has built their own collection of "API Connectors" which provide a high level interface for users to interact with APIs. A lot of work is being duplicated.

## Guiding Principles
OpenSync is based on a few principles that guide our efforts.

1. API Integrations should be free for end users and incur a small infrastructure cost for SaaS companies.
2. API Integrations should be configured by nontechnical users, and we should create GUI tools that target nontechnical users.
3. There should be an open source format describing APIs at a higher level (Connectors), allowing any organization to create their own API integration platform, focusing on user experience rather than building/maintaining libraries of connectors.
4. We should standardize various domain specific objects (such as CRM Leads), thus making it easier to set up advanced integrations between systems.

### What is an API connector?

A "Connector" is a high level description of how to integrate with an API. You can think of it like a "SDK". Rather than simply describing the endpoints of an API, it describes which of those endpoints
are "Actions" and which ones are "triggers". You can think of "Actions" as `POST, PUT, and DELETE` commands, whereas triggers are more likely `GET` commands which return a list of recently created/updated data.

For instance:
```
A Salesforce connector has a trigger called "new_lead".
new_lead is implemented as a HTTP call to the endpoint `GET /leads`.
Salesforce also has actions such as "create_lead" and "update_lead".
These are implemented as HTTP calls to `POST /leads` and `PUT /leads`, respectively.
```

An example connector can be located at https://github.com/sbryant31/OpenSync/blob/master/connectors/example.js

### Benefits of Open API Connectors

If we built an open source library of API connectors that obeyed a specific format, we could lower the cost of API integration and connection dramatically. Rather than companies
spending time and effort building private libraries of API connectors, we could all contribute to one global repository. We can build tools around it which allow every company to
add themselves to the network, immediately enabling applications to "connect to the web." Most importantly, their users won't have to sign up for another service (such as Zapier).

We can imagine a world where every app can easily integrate with every other app, and the integrations are essentially free or extremely low cost.

### Roadmap

#### Building the OpenSync Connector Spec
The first step is to define a connector specification. It is possible that we will use an extension of OpenAPI/Swagger, as well as a javascript-based API spec.

The workato connector SDK is a good learning resource for this investigation.
https://github.com/workato/connector_sdk

#### Define an OpenSync API
Once we have defined a connector specification and we have built a sizeable library of open connectors, we will create an open source API that can be deployed on premesis or consumed as a service. This API provides the high level endpoints that a service must implement in order to embed their very own API integration engine.

#### Building an Open Source API Integration Engine
The final step is building an open source full stack web application that mimicks existing API integration platforms-as-a-service. This application will be hosted as a service on opensync.io at a minimum
cost to SaaS companies. Those companies will also be free to implement their own engines using our open source tools and API.

#### And Beyond: standardizing domain-specific object schemas
The holy grail of API integration is creating standardization of domain-specific object schemas. What does this mean?

Take CRM's for example. The "Contact" object represents an entity with an Email address, name, and one or more custom fields. If we can create a standardized "Contact" object and each application can create a mapping from their format to the standardized format, we can make two-way, instant high-level synchronizations possible for end users, with minimal configuration. Basically, plug-and-play deep API integrations.

### Contributing / Join the Discussion
All feedback and dialogue is welcomed. We are currently actively seeking contributors from the OpenAPI community.

Our slack community is opensync.slack.com

Email sbryant31@gmail.com for an invite / to join the community. We'd be happy to have you!

## FAQ

### Why is OpenSync a DAO (Decentralized Autonomous Organization?)
Rather than requiring each SaaS company to spin up their own OpenSync frontend and API integration backend, it's better to create a hosted solution with a simple "1-2-3" onboarding process for SaaS
companies. To lower the cost of this solution to an absoute minimum, we plan on building a Decentralized Organization that uses blockchain technology to distribute either equity or "app tokens".

This will reward early adopters and keep the price of such a system to an absolute minimum.

### What about Swagger/OpenAPI?

OpenSync and OpenAPI are complementary technologies. OpenSync builds on the legacy that OpenAPI began by building an extension on top of the OpenAPI spec.

OpenAPI provides a description of HTTP endpoints for a given API. OpenSync adds to that description by specifying which HTTP endpoints are Triggers and which are Actions, as well as providing
a high level description of the parameters required and the functionality of
