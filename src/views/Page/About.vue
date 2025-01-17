<script setup>
import PageTitle from '@/components/PageTitle';
</script>

<template>
    <PageTitle :title="'About Us'" />
    <section class="starter-section section bg-transparent">
        <div class="container">
            <div class="row gy-4 justify-content-center">
                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                    <div class="card rounded-sm border-0 h-100 bg-transparent card-hover">
                        <div class="card-body text-start">
                            <h3 class="text-app">About Oracium</h3>
                            <p class="text-white fw-normal fs-13px m-0">Oracium (AI Governance Oracle) is a
                                decentralized, AI-powered oracle designed to enhance decision-making for DAOs and
                                decentralized protocols. It provides on-chain governance intelligence by analyzing
                                historical voting patterns, proposal effectiveness, and market sentiment, enabling more
                                informed governance decisions.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6" data-aos="fade-left" data-aos-delay="100">
                    <div class="card rounded-sm border-0 h-100 bg-transparent card-hover">
                        <div class="card-body text-start">
                            <h3 class="text-app">What Is?</h3>
                            <p class="text-white fw-normal fs-13px m-0">Oracium is an AI-driven oracle service that
                                aggregates and analyzes on-chain data related to decentralized governance. It delivers
                                real-time insights to assist decentralized organizations in proposal evaluation, voter
                                behavior analysis, and risk assessment, ensuring transparency and efficiency in
                                decision-making processes.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                    <div class="card rounded-sm border-0 h-100 bg-transparent card-hover">
                        <div class="card-body text-start">
                            <h3 class="text-app">Blockchain Technology</h3>
                            <p class="text-white fw-normal fs-13px m-0">Oracium operates on a decentralized oracle
                                network, ensuring that governance insights are tamper-proof and verifiable on-chain. It
                                supports multi-chain interoperability, allowing DAOs across multiple ecosystems to
                                access governance intelligence.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6" data-aos="fade-left" data-aos-delay="100">
                    <div class="card rounded-sm border-0 h-100 bg-transparent card-hover">
                        <div class="card-body text-start">
                            <h3 class="text-app">AI Technology</h3>
                            <p class="text-white fw-normal fs-13px m-0">Oracium leverages machine learning algorithms
                                and natural language processing (NLP) to analyze governance proposals, historical voting
                                trends, and social sentiment. The AI continuously learns from new data, improving its
                                accuracy in scoring proposals and identifying governance threats over time.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
