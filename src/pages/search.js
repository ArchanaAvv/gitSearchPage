import React, { useState, useEffect } from 'react';
import './style.css';
import { Grid, Form, Card, Icon, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'


function SearchPage() {
  const [userInput, setUserInput] = useState('');
  const [searchText, setSearchText] = useState('');
  const [flag, setFlag] = useState(false);
  const [data, setDatas] = useState([])

  useEffect(() => {
    getAllgithubuserList();
  }, [])

  const getAllgithubuserList = () => {
    fetch("https://api.github.com/users", {
      headers: {
        'Accept': 'application/vnd.github.v4+json'
      }
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        setDatas(data)
      })
      .catch(error => console.log(error));

  }

  const handleSearch = (e) => {
    setSearchText(e.target.value)
    if (e.target.value !== "") {

      setUserInput(e.target.value)
    }
    else {
      getAllgithubuserList();
      setUserInput("");
      setFlag(false);
    }

  }
  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        let selectData = []
        selectData.push(data);
        setDatas(selectData);
        setFlag(true);
      })
      .catch(error => console.log(error));

  }

  const handleClear = () => {
    setSearchText('');
    setUserInput("");
    getAllgithubuserList();
    setFlag(false);
  }
  // error hanndling
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  return (
    <>
      <div>
        <div className="navbar">GitHub</div>
        <div className="search">
          <Form >
            <Form.Group>
              <input placeholder="Github user" name="github user" aria-label="cost-input" value={searchText} onChange={handleSearch} />
              <Form.Button content='Submit' onClick={handleSubmit} aria-label="submit" />
              <Form.Button content='Clear' onClick={handleClear} aria-label="clear" />

            </Form.Group>
          </Form>
        </div>
        <Grid container relaxed columns={4}>
          {data && data.length != 0 && data.map((item) => {
            return <Grid.Column key={item.id}>
              <Card>
                <Image src={item.avatar_url} wrapped ui={false} alt="user-image" aria-hidden="true" />
                <Card.Content>
                  <Card.Header>{item.name}</Card.Header>
                  <Card.Header>{item.login}</Card.Header>
                </Card.Content>
                {flag == true ?
                  <>
                    <Card.Content extra>
                      <a>
                        <Icon name='user' />
                        {item.followers} Followers
              </a>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='user' />
                        {item.public_repos} Repos
              </a>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='user' />
                        {item.following} Following
              </a>
                    </Card.Content>
                  </>
                  : null}
              </Card>
            </Grid.Column>

          })}
        </Grid>
        {/* </Grid> */}
      </div>

    </>
  )
}

export default SearchPage;
