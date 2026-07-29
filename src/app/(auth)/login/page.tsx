import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


export default function LoginPage() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>
                    Welcome Back
                </CardTitle>

                <CardDescription>
                    Login to your RentNest account
                </CardDescription>
            </CardHeader>


            <CardContent>

                <form className="space-y-4">

                    <div className="space-y-2">
                        <Label>
                            Email
                        </Label>

                        <Input
                            type="email"
                            placeholder="example@gmail.com"
                        />
                    </div>


                    <div className="space-y-2">
                        <Label>
                            Password
                        </Label>

                        <Input
                            type="password"
                            placeholder="********"
                        />
                    </div>


                    <Button className="w-full">
                        Login
                    </Button>

                </form>

            </CardContent>
        </Card>
    );
}