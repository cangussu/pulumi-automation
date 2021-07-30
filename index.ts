#!/usr/bin/env node
import {LocalWorkspace} from "@pulumi/pulumi/automation";

import { createResources } from "@cangussu/pulumi-resource-generator";

const createStack = async (projectName: string, stackName: string) => {
    try {
        const stack = await LocalWorkspace.createOrSelectStack({
            stackName,
            projectName,
            program: createResources,
        });

        await stack.setConfig("myoption:region", { value: "us-central1" });
        const prevRes = await stack.preview({ onOutput: console.info });
        return prevRes;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const run = async () => {
    const stack = await createStack("pulumi-test", "automation-sample");
};

run();
