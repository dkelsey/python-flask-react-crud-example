# Assumptions

* I made an assumption that there's a defined need for weekly backups of the data.

* With that, the smallest assertion that backups worked would be:
  
  * look at file size and assert it reasonalbly close to the same size as the provious backup - this can be scipted.
  
  * restore the data in another instance and manually spot-check is, or better, script a more thorough validation of the data
  
  * This is not a new problem and there are likely many prescribed methods to do this.  I would chose one that satisfied the defined need.

* I would consult with the Product Owner or stakeholders to get the stated need for data backups, then engineer a solution that satisfied that.  This would include testing, verification. exercises.
  
  * *A thought occurred to me*, that there could be a need to load a cleaned version (de-identified) of the database into other environments such as a test environment 

# Backup Processes

## Manual Backup/Restore

*I'm out of time*

I would follow something that makes sense for our needs.

*Assumption:* I would have a manual process; I use simple manual processes, which eliminate complexity and abstration, to assert that the the most basic task can be acheived and understood.

This looks like a good starting point:

[https://www.digitalocean.com/community/tutorials/how-to-back-up-restore-and-migrate-a-mongodb-database-on-ubuntu-14-04](https://www.digitalocean.com/community/tutorials/how-to-back-up-restore-and-migrate-a-mongodb-database-on-ubuntu-14-04)

## Automated Backup

*I'm out of time*

I would look at Jobs in OpenShift.  There are a number of ways people have done this. I would choose one that satisfies the requirements.
