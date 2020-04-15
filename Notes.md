# Assumptions

- The assignment clearly stated **"You don't need to create your won app"**
  - I wanted an app that was "just complext enough" to satisfy the "at least 2 componets", and
  - I wanted an app that "actually worked"
  - I wantd an app that used Flaks and React.
  - I spent more time on integrating with Keycloak than I wanted - it was fun learning - a learned enough to get something working.
- Regarding High Availability (AH), for this exercise I made an assumption that the app would support a small number of users; a rough guess: up-to 20 concurrent users, avg 10 Request Per Second.

# High Availability (HA)

* There a number of ways to satisfy HA; OpenShift provides ways to scale components of an apliction with Replication Controllers, There are known way to cluster, shart and scale database nodes.   
* I would provide HA that satisfies a defined, measured need.  
* To definding the need I would
  * measure sessions, requests, number of concurrent users.  
  * I would use a something like SnowPlow to collect information in real user experience.
  * I would look real user 95th and 99th percentil response time as a means of understanding how our servers is performing.
  * I would consult with a Product Owner or stakehoders to get their stated HA requirements.  
  * I would use an appropritate load generating tool (I have used Tsung and Loscust.io) to exercise components at the defined level. 
* I would use the defined HA needs to engineer an architecture that would acheive the HA Requirements.
* For this exercise I made an assumption that the app would support a small number of users,  a rough guess: up-to 20 concurrent users, avg 10 Request Per Second.  
* At this point the kudo-app and kudo-api applications can be scaled using the scaling feature of OpenShfit Replcation Controllers.
* The MongoDB I used is a basic one; I would have to provision an HA deployment.  I assumed this to be good enough; without a clear definion of the need I didn't want to guess.

# Playbooks

I've begun adopting practices described by Google's Site Reliability Enginerring (SRE) - [https://landing.google.com/sre/](https://landing.google.com/sre/).   There are a number of facets to SRE that I follow but here I'll describe the use of Playbooks.  I'm adopting playbooks as a tool to shift our culture, of "triblal knowledge orally shared in cross-training sessions", to a culture of "team capability" and "defined capability".  

All of this to state, that I would provide playbooks with this which would include:

* product overview

* dependancies

* Service Level Objective (SLO)

* Product Owner and key contacts - key clients.

* where components are hosted

* start/stop processes

* trouble shooting processes

* scripts and utilites to assert components of the service are failing and have been restored.

* 
