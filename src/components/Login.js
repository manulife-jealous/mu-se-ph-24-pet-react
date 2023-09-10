import { useState } from 'react';
import { Button } from '@manulife/mux';

const Login = ({user}) => {
    const users = [
        {
          id: 1,
          name: "Ian Paul Eco",
          email: "ian_paul_eco@manulife.ca",
          phone: "123-4567",
          password: "Awkward"
        },
        {
          id: 2,
          name: "Jealous Dizon",
          email: "jealous_dizon@manulife.ca",
          phone: "890-1234",
          password: "Ambie Vert"
        },
        {
          id: 3,
          name: "Christian Librea",
          email: "christian_librea@manulife.ca",
          phone: "567-8901",
          password: "Gene Rosity"
        },
      ]

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [currentUser, setUser] = useState(user);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleOnClick = () => {
            setUser(users.filter(user => {return user.email === email && user.password === password}));
            setIsLoggedIn(currentUser.length === 0 ? isLoggedIn : !isLoggedIn)
        }
    
    const handleOnChange = (event) => {
            setEmail(event.target.value);
    }

    const handleOnPassword = (event) => {
        setPassword(event.target.value);
    }

    return (
    <>
        <div class="_6lux">
            <input type="text" onChange={handleOnChange} value={email} class="inputtext _55r1 _6luy" name="email" id="email" data-testid="royal_email" placeholder="Email address" autofocus="1" aria-label="Email address or phone number" />
        </div>
        <div class="_6lux">
            <div class="_6luy _55r1 _1kbt" id="passContainer">
                <input type="password" onChange={handleOnPassword} value={password} class="inputtext _55r1 _6luy _9npi" name="pass" id="pass" data-testid="royal_pass" placeholder="Password" aria-label="Password" />
                <div class="_9ls7 hidden_elem" id="u_0_3_Lx">
                    <a href="#" role="button">
                        <div class="_9lsa">
                            <div class="_9lsb" id="u_0_4_MR"></div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <input type="hidden" name="jazoest" value="2990" autocomplete="off" />
        <input type="hidden" name="lsd" value="AVoUKsxAkTM" autocomplete="off" />
        <div>                        
        </div>
        <input type="hidden" autocomplete="off" name="login_source" value="comet_headerless_login" />
        <input type="hidden" autocomplete="off" name="next" value="" />
        <div class="_6ltg">
            <Button onClick={handleOnClick} class="_42ft _4jy0 _6lth _4jy6 _4jy1 selected _51sy" name="login" data-testid="royal_login_button" id="u_0_5_ZF">Log in </Button>
            { isLoggedIn ?
            currentUser.map(user => {
                return(<div key={user.id}>{user.name}</div>)
            }) : <div>The email address you entered isn't connected to an account. Find your account and log in.</div>}
        </div>
    </>
    )

}

export default Login;