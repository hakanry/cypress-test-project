import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import axios from "axios";

const initialForm = {
  ad: "",
  soyad: "",
  email: "",
  password: "",
  terms: false,
};

export const errorMessages = {
  ad: "Adınız 2 karakterden fazla olmalı",
  soyad: "Soyadınız 2 karakterden fazla olmalı",
  email: "Geçerli bir email adresi giriniz",
  password: "Güçlü bir şifre giriniz",
};

export default function Register() {
  const [id, setId] = useState("");
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false,
    terms: false,
  });
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  let regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === "checkbox" ? event.target.checked : value;
    setForm({ ...form, [name]: value });

    if (name === "ad") {
      if (value.trim().length > 2) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "soyad") {
      if (value.trim().length > 2) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "password") {
      if (regularExpression.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "terms") {
      if (value) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };
  useEffect(() => {
    if (
      form.ad.length > 2 &&
      form.soyad.length > 2 &&
      validateEmail(form.email) &&
      regularExpression.test(form.password) &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    axios
      .post("https://reqres.in/api/users", form)
      .then((res) => {
        setId(res.data.id);
        setForm(initialForm);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="ad">Ad</Label>
        <Input
          id="ad"
          name="ad"
          placeholder="Adınızı giriniz"
          type="text"
          onChange={handleChange}
          value={form.ad}
          invalid={errors.ad}
          data-cy="input-ad"
        />
        {errors.ad && <FormFeedback>{errorMessages.ad}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="soyad">Soyad</Label>
        <Input
          id="soyad"
          name="soyad"
          placeholder="Soyadınızı giriniz"
          type="text"
          onChange={handleChange}
          value={form.soyad}
          invalid={errors.soyad}
          data-cy="input-soyad"
        />
        {errors.soyad && <FormFeedback>{errorMessages.soyad}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Emailinizi giriniz"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
          data-cy="input-email"
        />
        {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Şifrenizi giriniz"
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
          data-cy="input-password"
        />
        {errors.password && (
          <FormFeedback>{errorMessages.password}</FormFeedback>
        )}
      </FormGroup>

      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={errors.terms}
          data-cy="checkbox"
        />{" "}
        <Label htmlFor="terms" check>
          Hizmet şartlarını ve gizlilik politikasını kabul ediyorum
        </Label>
      </FormGroup>

      <FormGroup className="text-center p-4">
        <Button disabled={!isValid} color="primary" data-cy="buton-submit">
          Kayıt Ol
        </Button>
        <FormGroup>{id && <p data-cy="id-message">ID: {id}</p>}</FormGroup>
      </FormGroup>
    </Form>
  );
}
