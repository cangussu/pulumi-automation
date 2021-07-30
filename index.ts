#!/usr/bin/env node
import {
    LocalWorkspace,
    StackAlreadyExistsError,
} from "@pulumi/pulumi/automation";

import { createResources } from "@cangussu/pulumi-resource-generator";

const createStack = async (projectName: string, stackName: string) => {
    try {
        const stack = await LocalWorkspace.createOrSelectStack({
            stackName,
            projectName,
            program: createResources,
        });

        // await stack.workspace.installPlugin("kubernetes", "v3.5.1");
        await stack.setConfig("chatpay:region", { value: "us-central1" });
        const prevRes = await stack.preview({ onOutput: console.info });
        return prevRes;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const run = async () => {
    const stack = await createStack("dev.chatpay.com.br", "automation-sample");
};

run();
