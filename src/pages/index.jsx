import Head from "next/head";
import { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
    // console.log(countries)

    const [keyword, setKeyword] = useState("");

    const filteredCountries = countries.filter(
        (country) =>
            country.name.toLowerCase().includes(keyword) ||
            country.region.toLowerCase().includes(keyword) ||
            country.subregion.toLowerCase().includes(keyword)
    );

    const onInputChange = (e) => {
        e.preventDefault();

        setKeyword(e.target.value.toLowerCase());
    };

    return (
        <Layout>

            <div className={styles.inputContainer}>
                <div className={styles.counts}>
                    Found {countries.length} countries{" "}
                </div>

                <div className={styles.input}>
                    <SearchInput
                        placeholder="Filter by Name, Region or SubRegion"
                        onChange={onInputChange}
                    />
                </div>

                
            </div>

           

            <CountriesTable countries={filteredCountries} />
        </Layout>
    );
}

export const getStaticProps = async () => {
    const countries = await fetch(
        "https://restcountries.eu/rest/v2/all"
    ).then((res) => res.json());

    return {
        props: {
            countries,
        },
    };
};
