<b>Notes about assignment.</b>
<br/><br/>
The S3 dummy endpoint does not actually allow data to be written so I am not sure the intention is to run this microservice as a test but in order for it to be functional - that would need to reference a correct S3 endpoint and configured with the valid AWS credentials.
<br/><br/>
The SQL queries were implemented using a ORM Repository that attempting to connect to a fake PostGres instance - this is currently prohibiting the service from starting but I assumed the intention was to see those queries written into Typescript form using respositories.
<br/><br/>
That code can be found in the Onboarding Service.
<br/><br/>
SQL Queries:
1. Write a query to retrieve the 10 most recently onboarded customers.
2. Write a query that filter all customers with emails from @gmail.com
3. Write a query that shows the number of customers created per month in 2025.
4. Write a query to find all email addresses that appear more than once.
5. Write a query to find all customers whose first name starts with “A”.
