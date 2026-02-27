export const welcomeUser = ({firstName,email,randomPassword}:{ 
  firstName: string; 
  email: string; 
  randomPassword: string 
}) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Welcome, ${firstName}</h2>
    <p>Your account has been successfully created.</p>
    
    <h3>Login Details</h3>
    <ul>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Password:</strong> ${randomPassword}</li>
    </ul>

    <p>Please <strong>log in and change your password</strong> after your first login for security.</p>
    <p>If you did not request this account, please contact support immediately.</p>

    <br/>
    <p>Chrona Team</p>
  </div>
`;