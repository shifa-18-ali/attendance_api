 
 
 1. Employee Register Api:-

 http://localhost:5000/api/auth/register

JSON : 
{
  "name": "Ravi Kumar",
  "email": "ravi.kumar@company.com",
  "password": "Ravi@123",
  "role": "employee",
  "branch": "Delhi",
  "proof": "AADHAAR123456",
  "designation": "Software Engineer",
  "dob": "1998-06-15",
  "contact": 9876543210,
  "address": "Delhi, India",
  "faceEmbedding": [
    0.123,
    -0.456,
    0.789,
    0.321,
    -0.654,
    0.987
  ]
}
2.Employee Login Api:-

http://localhost:5000/api/auth/login

{
  "email": "ravi.kumar@company.com",
  "password": "Ravi@123"
}
3.Admin Register Api:-      
            
http://localhost:5000/api/auth/registerAdmin
{ 
"name":"Adminname",
   "email": "admin@head.com",
  "password": "Admin@*123",
   "branch":"Delhi",

}