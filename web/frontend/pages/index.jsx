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
import { useAppQuery } from '../hooks/index';
import { ProductsCard } from "../components";

const index = () => {
  const { data } = useAppQuery({
    url: "/admin/api/2022-10/products"
  });

  const [value, setValue] = useState("Name");
  const [state, setState] = useState(false);

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  function handleSubmit(e) {
    setState(true);
    e.preventDefault();
    console.log(value);
    console.log(data);
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
