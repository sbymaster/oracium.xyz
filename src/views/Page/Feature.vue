<script setup>
import PageTitle from '@/components/PageTitle';
</script>

<template>
    <PageTitle :title="'features'" />
    <section class="starter-section section bg-transparent">
        <div class="container">
            <div class="row gy-4 justify-content-between">
                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                    <div class="card rounded-sm border-0 h-100 bg-transparent card-hover">
                        <div class="card-body text-start">
                            <h5 class="text-app">Data Aggregation</h5>
                            <p class="text-white fw-normal fs-13px m-0">Collects on-chain governance data, historical
                                voting patterns, and external market trends.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6" data-aos="fade-left" data-aos-delay="100">
                    <div class="card rounded-sm border-0 h-100 bg-transparent card-hover">
                        <div class="card-body text-start">
                            <h5 class="text-app">AI Analysis Layer</h5>
                            <p class="text-white fw-normal fs-13px m-0">Uses advanced AI models to assess proposal
                                effectiveness, governance behavior, and voter sentiment.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                    <div class="card rounded-sm border-0 h-100 bg-transparent card-hover">
                        <div class="card-body text-start">
                            <h5 class="text-app">Proposal Quality Scoring</h5>
                            <p class="text-white fw-normal fs-13px m-0">Scores proposals on clarity, risk, and
                                alignment with past successful governance actions.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6" data-aos="fade-left" data-aos-delay="100">
                    <div class="card rounded-sm border-0 h-100 bg-transparent card-hover">
                        <div class="card-body text-start">
                            <h5 class="text-app">Risk Prediction Engine</h5>
                            <p class="text-white fw-normal fs-13px m-0">Identifies governance risks, such as sybil
                                attacks and voter apathy.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                    <div class="card rounded-sm border-0 h-100 bg-transparent card-hover">
                        <div class="card-body text-start">
                            <h5 class="text-app">Decentralized Oracle Layer</h5>
                            <p class="text-white fw-normal fs-13px m-0">Delivers analyzed data to DAOs through a
                                decentralized network for unbiased insights.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
