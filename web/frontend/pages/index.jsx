import { React, useState, useCallback } from "react";
import {
  Page,
  Layout,
  Card,
  Button,
  Form,
  FormLayout,
  TextField,
  Stack,
} from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import axios from "axios";

const axiosGetData = () => {
  axios({
    url: '/admin/api/2022-10/products.json',
    method: "GET",
    headers: {
      'X-Shopify-Access-Token': `${process.env.TOKEN}`,
      'Content-Type': 'application/json'
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};


const index = () => {
  const [value, setValue] = useState("Name");
  const [state, setState] = useState(false);

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  function handleSubmit(e) {
    setState(true);
    e.preventDefault();
    console.log(value);
    axiosGetData();
  }

  function handleCancel() {
    setState(false);
  }

  function handleSelection(resources) {
    setState(false);
    resources.selection.map((name) => (name.handle = value));
    console.log(resources.selection);
  }

  return (
    <Page title="Ivy Park Merch">
      <Layout>
        <Layout.Section>
          <Card title="Change Product Name" sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  label="Type on the input the new name and select which product name to change"
                  value={value}
                  onChange={handleChange}
                />
                <Button primary submit>
                  Select Product
                </Button>
              </FormLayout>
              <ResourcePicker
                resourceType="Product"
                open={state}
                onCancel={handleCancel}
                onSelection={handleSelection}
              />
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default index;
